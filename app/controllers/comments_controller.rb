class CommentsController < ApplicationController
    def create
        @comment = Comment.new(
            content: params[:comment][:content],
            timestamp: params[:comment][:timestamp],
            track_id: params[:track_id], 
            user_id: 1)
        if @comment.save
            respond_to do |format|
                format.json do
                    render json: @comment.as_json(only: [
                        :id,
                        :content,
                        :timestamp,
                        :track_id,
                        :user_id,
                        :created_at,
                        :updated_at
                    ]), status: :created
                end

                format.html do
                    redirect_to track_path(params[:track_id])
                end
            end
        else
            respond_to do |format|
                format.json do
                    render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
                end

                format.html do
                    redirect_to track_path(params[:track_id]), alert: @comment.errors.full_messages.to_sentence
                end
            end
        end
    end

    def destroy
    end

    def update
    end
end
