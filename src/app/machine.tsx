import { createMachine, assign } from "xstate";

const BASE_URL = `http://localhost:8000`;
function createUserApi(email: string, topicId: number) {
  return fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: "Test",
      last_name: "User",
      email,
      topic_id: topicId
    }),
  }).then((res) => res.json());
}

const machine = createMachine(
  {
    context: {
      email: "",
      topic: "",
      topicId: 0,
      emailInput: null
    },
    id: "New Machine",
    initial: "Ready",
    tsTypes: {} as import("./machine.typegen").Typegen0,
    schema: {
      context: {} as {
        email: string;
        topic: string;
        topicId: number;
        emailInput: React.RefObject<HTMLInputElement> | null;
      },
      events: {} as 
        { type: "SUBMIT" }
        | { type: "INPUT.EMAIL"; data: string }
        | { type: "INPUT.TOPIC"; data: { id: number; name: string; } }
    },
    states: {
      Ready: {
        states: {
          Error: {
            initial: "None",
            states: {
              None: {
                type: "final"
              },
              Network: {
                type: "final"
              }
            }
          },
          Email: {
            initial: "Ready",
            states: {
              Ready: {
                on: {
                  SUBMIT: [
                    {
                      target: "Submitting",
                      cond: "isEmailValid"
                    },
                    {
                      target: "Error",
                      actions: "showValidationError"
                    }
                  ]
                }
              },
              Submitting: {
                type: "final"
              },
              Error: {}
            },
            on: {
              "INPUT.EMAIL": {
                target: ".Ready",
                actions: "cacheEmail"
              }
            }
          },
          Topic: {
            initial: "Empty",
            states: {
              Empty: {
                on: {
                  SUBMIT: {
                    target: "Error"
                  }
                }
              },
              Selected: {
                on: {
                  SUBMIT: {
                    target: "Submitting"
                  }
                }
              },
              Error: {},
              Submitting: {
                type: "final"
              }
            },
            on: {
              "INPUT.TOPIC": [
                {
                  target: ".Selected",
                  cond: "isTopicValid",
                  actions: "cacheTopic"
                },
                {
                  target: ".Empty",
                  actions: "cacheTopic"
                }
              ]
            }
          }
        },
        type: "parallel",
        onDone: {
          target: "Submitting"
        }
      },
      Submitting: {
        invoke: {
          src: "createUser",
          id: "createUser",
          onDone: [
            {
              target: "Success"
            }
          ],
          onError: [
            {
              target: "#New Machine.Ready.Error.Network"
            }
          ]
        }
      },
      Success: {
        type: "final"
      }
    },
    predictableActionArguments: true,
    preserveActionOrder: true
  },
  {
    actions: {
      cacheEmail: assign((_, event) => {
        return {
          email: event.data
        };
      }),
      cacheTopic: assign((_, event) => {
        return {
          topic: event.data.name,
          topicId: event.data.id
        };
      }),
      showValidationError: (context) => {
        if (context.emailInput && context.emailInput.current) {
          context.emailInput.current.reportValidity();
        }
      }
    },
    guards: {
      isTopicValid: (_, event) => {
        return !!event.data;
      },
      isEmailValid: (context) => {
        const isEmpty = context.email.trim().length === 0;
        if (isEmpty) {
          return false;
        }

        return !!(
          context.emailInput &&
          context.emailInput.current &&
          context.emailInput.current.checkValidity()
        );
      }
    },
    services: {
      createUser: (context) => {
        return createUserApi(context.email, context.topicId)
      }
    }
  }
);

export default machine;
