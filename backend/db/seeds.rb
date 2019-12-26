# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

# User.destroy_all
# Shift.destroy_all
# Organisation.destroy_all


15.times do Organisation.create(
  name: Faker::FunnyName.three_word_name,
  hourly_rate: Faker::Number.within(range: 10..20)
)
end

15.times do User.create(
    name: Faker::Name.first_name,
    email: Faker::Internet.email,
    password: 'a',
    organisation_id: Faker::Number.between(from: 1, to: 15)
)
end



75.times do Shift.create(
  start: Faker::Time.forward(days: 1, period: :morning),
  end: Faker::Time.forward(days: 1, period: :evening),
  break_length: Faker::Number.within(range: 10..80),
  user_id: Faker::Number.between(from: 1, to: 15),
)
end





