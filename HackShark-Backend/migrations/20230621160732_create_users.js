
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments().primary();
        table.string('first_name');
        table.string('last_name');
        table.string('email');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users')
};


