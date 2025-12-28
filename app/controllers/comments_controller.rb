class CommentsController < ApplicationController
    def create
        puts "params: #{params}" 
        @comment = Comment.new(content: params[:comment][:content], track_id: params[:track_id], user_id: 1)
        if @comment.save
            puts "comment saved"
            # no redirection needed yet?
        else
            puts "comment not saved"
            puts @comment.errors.full_messages
        end
    end

    def destroy
    end

    def update
    end
end
