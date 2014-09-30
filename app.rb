require 'sinatra'

get '/' do
  erb :index
end

get '/aboutjunk' do
  erb :other
end