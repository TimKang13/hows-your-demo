# Track helper methods for Rails console
# Load with: load Rails.root.join('lib/scripts/track_helpers.rb')

def track(id = nil)
  if id
    Track.find(id)
  else
    Track.first
  end
end

def tracks
  Track.all
end

def track_last
  Track.last
end

def track_random
  Track.order("RANDOM()").first
end

def track_with_audio
  Track.joins(:audio_file_attachment).first
end

def track_with_comments
  Track.joins(:comments).distinct.first
end

# Find track by title (partial match, case-insensitive)
def track_by_title(title)
  Track.where("title ILIKE ?", "%#{title}%").first
end

# List all tracks with basic info
def list_tracks
  Track.includes(:user).find_each do |t|
    puts "#{t.id}: #{t.title} (by #{t.user&.username || 'Unknown'})"
  end
  nil
end

puts "Track helpers loaded!"
puts "Available methods:"
puts "  track(id)          - Get track by ID (or first track if no ID)"
puts "  tracks             - Get all tracks"
puts "  track_last         - Get last track"
puts "  track_random       - Get random track"
puts "  track_with_audio   - Get first track with audio attached"
puts "  track_with_comments - Get first track with comments"
puts "  track_by_title(str) - Find track by title (partial match)"
puts "  list_tracks        - Print all tracks with IDs and titles"
