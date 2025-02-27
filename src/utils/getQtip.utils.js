import axios from "axios";

const getQtip = async (id) => {
  const worker_url = import.meta.env.VITE_WORKER_URL.split(",");
  try {
    const response = await axios.get(
      `${worker_url[Math.floor(Math.random() * worker_url?.length)]}/qtip/${id
        .split("-")
        .pop()}`
    );
    return response.data.results;
  } catch (err) {
    console.error("Error fetching genre info:", err);
    return err;
  }
};

export default getQtip;
