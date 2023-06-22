exports.up = function (knex) {
    return knex.schema.createTable('topics', function (table) {
        table.increments().primary();
        table.string('name');
  
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('topics')
};
