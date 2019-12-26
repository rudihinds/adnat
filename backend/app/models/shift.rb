class Shift < ApplicationRecord
  belongs_to :user



  def get_formatted_shift
    shift_length = ((self.start.to_time - self.end.to_time)/1.hours).round(1).abs
    hours_worked = (((shift_length*60) - self.break_length)/60).round(2).abs
  
      hash = {
        :employee_name => self.user.name,
        :shift_date => self.start.strftime("%m/%d/%Y"),
        :start_time => self.start.strftime("%I:%M %p"),
        :shift_finish =>  self.end.strftime("%I:%M %p"),
        :break_length => self.break_length,
        :shift_length =>  shift_length,
        :hours_worked => hours_worked,
        :shift_cost => (hours_worked * self.user.organisation.hourly_rate).round(2)
      }
  
    hash
    end
end
