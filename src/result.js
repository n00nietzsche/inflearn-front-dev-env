import axios from "axios";

export default {
  render: async () => {
    const res = await axios.get("/api/users");

    return (res.data || [])
      .map((user) => {
        return `<div>${user.id}: ${user.name}</div>`;
      })
      .join("---=");
  },
};
