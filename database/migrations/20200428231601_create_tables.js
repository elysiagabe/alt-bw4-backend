
exports.up = function(knex) {
    return knex.schema
      //USERS
      .createTable('users', tbl => {
          //id, primary key
          tbl.increments();
          //name, string, required
          tbl.string('name')
            .notNullable();
          //email, string, required, unique
          tbl.string('email')
            .notNullable()
            .unique();
          //password, string, required
          tbl.string('password')
            .notNullable();
      })
      //RECIPES 
      .createTable('recipes', tbl => {
          //id, primary key
          tbl.increments();
          //user_id, foreign key 
          tbl.integer('user_id')
              // .unsigned()
              .notNullable()
              .references('id')
              .inTable('users')
              .onUpdate('CASCADE')
              .onDelete('RESTRICT');
          //title, string, required
          tbl.string('title')
              .notNullable()
              .index();
          //source, string, optional
          tbl.string('source')
            .index();
          //ingredients, text, required
          tbl.text('ingredients')
              .notNullable();
          //instructions, text, required
          tbl.text('instructions')
              .notNullable();
          //notes, text, optional
          tbl.text('notes');
      })
      //CATEGORIES
      .createTable('categories', tbl => {
          //id, primary key
          tbl.increments();
          //name, string, required, unique
          tbl.string('name')
              .notNullable()
              .unique()
              .index();
      })
      //RECIPE_CATEGORIES
      .createTable('recipe_categories', tbl => {
          //id, primary key
          tbl.increments();
          //category_id, foreign key
          tbl.integer('category_id')
              // .unsigned()
              .notNullable()
              .references('id')
              .inTable('categories')
              .onUpdate('CASCADE')
              .onDelete('RESTRICT')
          //recipe_id, foreign key
          tbl.integer('recipe_id')
              // .unsigned()
              .notNullable()
              .references('id')
              .inTable('recipes')
              .onUpdate('CASCADE')
              .onDelete('RESTRICT')
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('recipe_categories')
      .dropTableIfExists('categories')
      .dropTableIfExists('recipes')
      .dropTableIfExists('users')
  };
  