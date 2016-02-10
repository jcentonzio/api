class AddPeriodToLead < ActiveRecord::Migration
  def change
    add_column :leads, :period, :datetime
  end
end
