const formatString = (string, slice = true) => {
  if (slice) {
    if (string.length > 45) {
      return (
        string[0].toUpperCase() + string.slice(1, 45).toLowerCase() + "..."
      );
    } else {
      return string;
    }
  } else {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }
};

export default formatString;
