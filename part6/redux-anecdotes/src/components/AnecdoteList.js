import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};
const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state
      .anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      .sort(function (a, b) {
        return b.votes - a.votes;
      })
  );
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(addVote(anecdote.id));
    dispatch(setNotification(`you voted "${anecdote.content}"`));
    setTimeout(() => dispatch(clearNotification()), 5000);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote anecdote={anecdote} handleClick={() => vote(anecdote)} />
      ))}
    </div>
  );
};
export default AnecdoteList;
