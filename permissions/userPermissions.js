const isLoggedIn = (request, response, next) => {
  if (!request.user) {
    return response.status(401).send("User Unauthenticated");
  }
  next();
};

// Users can edit or delete only their own profiles
const isOwnProfile = (request, response, next) => {
  const id = parseInt(request.params.id);

  if (request.user.id !== id) {
    return response.status(401).send("Unauthorized")
  }
  next();
}

module.exports = {
  isLoggedIn,
  isOwnProfile,
};
