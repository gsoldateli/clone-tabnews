function status(request, response) {
  response.status(200).json({ status: "chuvá" });
}

export default status;
