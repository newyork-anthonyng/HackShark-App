
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.createUser": { type: "done.invoke.createUser"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.createUser": { type: "error.platform.createUser"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "createUser": "done.invoke.createUser";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "cacheEmail": "INPUT.EMAIL";
"cacheTopic": "INPUT.TOPIC";
"showValidationError": "SUBMIT";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "isEmailValid": "SUBMIT";
"isTopicValid": "INPUT.TOPIC";
        };
        eventsCausingServices: {
          "createUser": "done.state.New Machine.Ready";
        };
        matchesStates: "Ready" | "Ready.Email" | "Ready.Email.Error" | "Ready.Email.Ready" | "Ready.Email.Submitting" | "Ready.Error" | "Ready.Error.Network" | "Ready.Error.None" | "Ready.Topic" | "Ready.Topic.Empty" | "Ready.Topic.Error" | "Ready.Topic.Selected" | "Ready.Topic.Submitting" | "Submitting" | "Success" | { "Ready"?: "Email" | "Error" | "Topic" | { "Email"?: "Error" | "Ready" | "Submitting";
"Error"?: "Network" | "None";
"Topic"?: "Empty" | "Error" | "Selected" | "Submitting"; }; };
        tags: never;
      }
  