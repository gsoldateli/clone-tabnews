import database from "/infra/database.js";
async function status(request, response) {
  const result = await database.query("SELECT 2221+1 as meu_amigo;");
  console.log({ result: result.rows });
  response.status(200).json({ status: "chuvá" });
}

export default status;
