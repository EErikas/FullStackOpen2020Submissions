const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "NEW":
      return [...state, action.data];
    case "VOTE":
      const id = action.data.id;
      const anecdoteToVote = state.find((n) => n.id === id);
      const updatedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      );
    case "INIT":
      return action.data;
    default:
      return state;
  }
};

export const createAnecdote = (content) => {
  return {
    type: "NEW",
    data: {
      content,
      votes: 0,
    },
  };
};
export const addVote = (id) => {
  return {
    type: "VOTE",
    data: { id },
  };
};

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: "INIT",
    data: anecdotes,
  };
};

export default reducer;
