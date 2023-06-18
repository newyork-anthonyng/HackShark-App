"use client";
import React, { useRef } from "react";
import { useMachine } from "@xstate/react";
import machine from "./machine";

interface Props {
  topics: { id: string; title: string }[];
}

export default function Signup({ topics }: Props) {
  const emailRef = useRef(null);
  const [state, send] = useMachine(machine, {
    context: {
      emailInput: emailRef,
    },
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
    <div className="hero-background h-full">
      {/* <pre>{JSON.stringify(state.value, null, 2)}</pre> */}
      <div className="max-w-xl mx-auto p-10">
        <div className="bg-slate-50 p-10">
          <div className="mb-3">
            <h1 className="text-2xl">SharkHack</h1>
          </div>
          <div className="mb-6">
            <p>
              Sign up to receive weekly emails with a research papers based on
              your interests.
            </p>
          </div>
          {state.matches("Success") ? (
            <p className="text-2xl">Success ✅</p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="topic">Select a topic</label>
                <select
                  id="topic"
                  className="block h-10 border-2 border-black mb-2"
                  value={state.context.topic}
                  onChange={handleTopicChange}
                >
                  {topics.map((topic) => {
                    return <option key={topic.id}>{topic.title}</option>;
                  })}
                </select>
                {state.matches("Ready.Topic.Error") && (
                  <p className="text-red-500 mb-3">Pick a topic</p>
                )}
              </div>

              <label className="block" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="border-2 border-black px-5 mb-4 h-10"
                value={state.context.email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                ref={emailRef}
              />
              {state.matches("Ready.Email.Error") && (
                <p className="text-red-500">Enter an email</p>
              )}

              <button
                type="submit"
                className="block px-5 bg-slate-700 text-white h-10 w-full"
                disabled={state.matches("Submitting")}
              >
                Sign up
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
