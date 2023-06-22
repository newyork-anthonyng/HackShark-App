exports.up = function (knex) {
    return knex.schema.createTable('topic_paper', function (table) {
        table.increments().primary();
        table.integer('topic_id');
        table.integer('paper_id');
        table.foreign('topic_id').references('id').inTable('topics');
        table.foreign('paper_id').references('id').inTable('research_papers');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('topic_paper')
};