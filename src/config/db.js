const sqliteLocal= {
    dialect: "sqlite",
    storage: "db.sqlite",
    define: {
        timestamps: true,
        freezeTableName: true,
        underscored: true
    }
};

const postgresqlLocal = {
    dialect: "postgres",
    host: "dpg-ci6s80mnqql0ldcrqtkg-a.oregon-postgres.render.com",
    username: "cascudo_user",
    password: "cerkrvrCP9zB26DFbDZaEeBVSi0Wr9fO",
    database: "cascudo_db",
    define: {
        timestamps: true,
        freezeTableName: true,
        underscored: true
    },
    dialectOptions: {
        ssl: true
    }
};

const dbConfig = postgresqlLocal;
export { dbConfig };
