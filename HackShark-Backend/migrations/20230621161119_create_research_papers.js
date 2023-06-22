exports.up = function (knex) {
    return knex.schema.createTable('research_papers', function (table) {
        table.increments().primary();
        table.string('title');
        table.text('abstract', 'longtext');
        table.string('url')
        table.integer('week_num');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('research_papers')
};