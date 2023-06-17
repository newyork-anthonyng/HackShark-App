'use client';
import React, { useRef } from "react";
import { useMachine } from "@xstate/react";
import machine from "./machine";

// TODO: Use a real API
const topics = [
  { id: "1", name: "Science" },
  { id: "2", name: "Health" },
  { id: "3", name: "Nature" }
];

export default function Signup() {
  const emailRef = useRef(null);
  const [state, send] = useMachine(machine, {
    context: {
      emailInput: emailRef
    }
  });

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    send({ type: "INPUT.EMAIL", data: e.target.value });
  }

  function handleTopicChange(e: React.ChangeEvent<HTMLSelectElement>) {
    send({ type: "INPUT.TOPIC", data: e.target.value });
  }
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    send({ type: "SUBMIT" });
  }

  return (
    <div>
      {/* <pre>{JSON.stringify(state.value, null, 2)}</pre> */}
      <div className="max-w-xl mx-auto p-10">
        <div className="mb-3">
          <h1 className="text-2xl">SharkHack</h1>
        </div>
        <div className="mb-3">
          <p>
            Sign up to receive weekly emails with a research papers based on
            your interests.
          </p>
        </div>
        {state.matches("Success") ? (
          <p className="text-2xl">Success ✅</p>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <div>
              <label className="sr-only" htmlFor="topic">
                Topic
              </label>
              <select
                id="topic"
                className="block h-10"
                value={state.context.topic}
                onChange={handleTopicChange}
              >
                <option value="">-- Select a topic --</option>
                {topics.map((topic) => {
                  return <option key={topic.id}>{topic.name}</option>;
                })}
              </select>
              {state.matches("Ready.Topic.Error") && (
                <p className="text-red-500 mb-3">Pick a topic</p>
              )}
            </div>
            <div className="h-10">
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="border-2 border-black px-5 h-full mb-3"
                value={state.context.email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                ref={emailRef}
              />

              <button
                type="submit"
                className="px-5 bg-slate-700 text-white h-full"
                disabled={state.matches("Submitting")}
              >
                Sign up
              </button>
              {state.matches("Ready.Email.Error") && (
                <p className="text-red-500">Enter an email</p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
