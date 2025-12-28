# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  content    :text             not null
#  timestamp  :decimal(10, 3)   default(0.0), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  track_id   :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_comments_on_track_id  (track_id)
#  index_comments_on_user_id   (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (track_id => tracks.id)
#  fk_rails_...  (user_id => users.id)
#
class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :track

    validates :content, presence: true
    validates :timestamp, presence: true
end
