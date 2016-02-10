class Api::LeadsController < ApplicationController



  def index 

    @leads = Lead.order('created_at desc').all
    respond_to do |format|
      format.json { render :json => @leads}
    end 

  end 


  def create
    @lead = Lead.create(lead_params)

    respond_to do |format|
       if @lead.save
         #format.html { redirect_to @task, notice: 'Task was successfully created.' }
         format.json { render :json => @lead}
       else
         #format.html { render :new }
         format.json { render :json => { :error => @lead.errors }, :status => 422 }
       end
     end
  end


  private

  def lead_params
    params.require(:lead).permit(:project_name, :email, :description, :period)
  end  


end 