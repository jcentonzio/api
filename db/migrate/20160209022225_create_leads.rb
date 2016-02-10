class CreateLeads < ActiveRecord::Migration
  def change
    create_table :leads do |t|
      t.string :project_name
      t.string :email
      t.text :description

      t.timestamps null: false
    end
  end
end
