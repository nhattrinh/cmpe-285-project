

// export default useFetch;
const News = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/market", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return { status: 'ok', data };
      } else {
        console.log("API call failed");
        return { status: 'failed', data: null };
      }
    } catch (error) {
      console.error("Error during API call:", error);
      return { status: 'error', data: null };
    }
  };
  
  export default News;
  