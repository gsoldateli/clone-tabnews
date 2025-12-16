import database from "/infra/database.js";
async function status(request, response) {
  const databaseName = process.env.POSTGRES_DB;

  const updatedAt = new Date().toISOString();

  const result = await database.query("SHOW server_version;");
  const databaseVersion = result.rows[0].server_version;

  const resultMaxConnections = await database.query("SHOW max_connections;");
  const databaseMaxConnections = resultMaxConnections.rows[0].max_connections;

  const resultStatActivityConnections = await database.query({
    text: "SELECT COUNT(*) FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const openedDatabaseConnections = parseInt(
    resultStatActivityConnections.rows[0].count,
    10,
  );

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: parseInt(databaseMaxConnections, 10),
        opened_connections: openedDatabaseConnections,
      },
    },
  });
}

export default status;
