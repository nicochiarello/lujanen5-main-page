const formatString = (string, slice = true) => {
  if (slice) {
    if (string.length > 40) {
      return (
        string[0].toUpperCase() + string.slice(1, 40) + "..."
      );
    } else {
      return string;
    }
  } else {
    return string[0].toUpperCase() + string.slice(1);
  }
};

export default formatString;
