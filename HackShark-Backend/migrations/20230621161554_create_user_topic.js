exports.up = function (knex) {
    return knex.schema.createTable('user_topic', function (table) {
        table.increments().primary();
        table.integer('user_id');
        table.integer('topic_id');
        table.foreign('user_id').references('id').inTable('users');
        table.foreign('topic_id').references('id').inTable('topics');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('user_topic')
};
