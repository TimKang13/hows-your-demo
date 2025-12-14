# == Schema Information
#
# Table name: tracks
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_tracks_on_user_id            (user_id)
#  index_tracks_on_user_id_and_title  (user_id,title) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Track < ApplicationRecord
    belongs_to :user

    has_one_attached :audio_file
    has_many :comments

    before_validation :use_file_name_as_default_title
    validates :title, presence: true
    validate :audio_file_validation


    def audio_file_validation
        return unless audio_file.attached?

        if audio_file.blob.byte_size > 500.megabytes
            errors.add(:audio_file, "is too big (max 500 MB)")
        end

        acceptable_types = [
            "audio/mpeg",      # .mp3
            "audio/wav",       # .wav
            "audio/x-wav",
            "audio/flac"       # .flac
        ]

        unless acceptable_types.include?(audio_file.blob.content_type)
            errors.add(:audio_file, "must be an audio file (mp3, wav, or flac)")
        end
    end

    private

    def use_file_name_as_default_title
        if self.title.blank?
            self.title = audio_file.filename.to_s.split(".").first
        end
    end
end
