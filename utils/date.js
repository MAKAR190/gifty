export const createReadableDate = (article) => {
  if (article) {
    const date = article._createdAt;
    return new Date(date)
      .toLocaleString("nu", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      })
      .split(",")[0];
  } else {
    const date = Date.now();
    return new Date(date)
      .toLocaleString("nu", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      })
      .split(",")[0];
  }
};
