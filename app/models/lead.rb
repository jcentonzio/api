class Lead < ActiveRecord::Base
	validates :project_name, :email, :description, :presence => { :message => "Es requerido" }
	validates_length_of :project_name, :minimum  => 5, :message => "El nombre es muy corto"
	validates_length_of :description, :maximum => 140, :message => "La descripción es muy larga"
	validates_length_of :description, :minimum => 10, :message => "La descripción es muy corta"
end
