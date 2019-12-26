class Organisation < ApplicationRecord

has_many :users, dependent: :nullify
has_many :shifts, through: :users


def get_shifts_for_org


formatted_shifts = self.shifts.order(:start).reverse.map do |s|

  shift_length = ((s.start.to_time - s.end.to_time)/1.hours).round(1).abs
  hours_worked = (((shift_length*60) - s.break_length)/60).round(2).abs

    hash = {
      :employee_name => s.user.name,
      :shift_date => s.start.strftime("%m/%d/%Y"),
      :start_time => s.start.strftime("%I:%M %p"),
      :shift_finish =>  s.end.strftime("%I:%M %p"),
      :break_length => s.break_length,
      :shift_length =>  shift_length,
      :hours_worked => hours_worked,
      :shift_cost => (hours_worked * s.user.organisation.hourly_rate).round(2)
    }

  hash
end

formatted_shifts
end

end
