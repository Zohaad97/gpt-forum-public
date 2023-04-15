import React from 'react';

export default function Home() {
  return (
    <>
      <div>GPT Forum</div>
      <div className="d-flex ps-relative">
        <input
          className="s-input"
          id="example-item1"
          type="text"
          placeholder="Enter your input here"
        />
      </div>
      <button className="s-btn" type="button">
        Hello
      </button>
      <button className="s-btn s-btn__outlined" type="button">
        Hello
      </button>
      <button className="s-btn s-btn__primary" type="button">
        Hello
      </button>
      <button className="s-btn s-btn__filled s-btn__danger" type="button">
        Danger Button
      </button>
      <button className="s-btn s-btn__filled s-btn__muted is-loading" type="button">
        Ask Question
      </button>
    </>
  );
}
