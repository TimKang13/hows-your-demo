class TracksController < ApplicationController
    before_action :set_tracks, only: [ :index, :create ]
    before_action :set_track, only: [ :show, :edit, :update, :destroy ]

    def index
        @tracks = Track.all
    end

    def new
    end

    def create
        # temporary: use 1 as user_id
        puts params
        @track = Track.new(title: params[:track][:title], audio_file: params[:track][:audio_file], user_id: 1)
        if @track.save
            puts "track saved"
            redirect_to tracks_path(@track)
        else
            puts "track not saved"
            puts @track.errors.full_messages
            render :index
        end
    end

    def show
        @track = Track.find(params[:id])
    end

    def edit
    end

    def update
    end

    def destroy
    end

    private

    def set_tracks
        @tracks = Track.all
    end

    def set_track
        @track = Track.find(params[:id])
    end
end
