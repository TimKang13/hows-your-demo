# User helper methods for Rails console
# Load with: load Rails.root.join('lib/scripts/user_helpers.rb')

def user(id = nil)
  if id
    User.find(id)
  else
    User.first
  end
end

def users
  User.all
end

def user_last
  User.last
end

def user_random
  User.order("RANDOM()").first
end

def user_with_tracks
  User.joins(:tracks).distinct.first
end

def user_with_comments
  User.joins(:comments).distinct.first
end

# Find user by username (partial match, case-insensitive)
def user_by_username(username)
  User.where("username ILIKE ?", "%#{username}%").first
end

# List all users with basic info
def list_users
  User.find_each do |u|
    puts "#{u.id}: #{u.username} (#{u.tracks.count} tracks, #{u.comments.count} comments)"
  end
  nil
end

puts "User helpers loaded!"
puts "Available methods:"
puts "  user(id)             - Get user by ID (or first user if no ID)"
puts "  users                - Get all users"
puts "  user_last            - Get last user"
puts "  user_random          - Get random user"
puts "  user_with_tracks     - Get first user with tracks"
puts "  user_with_comments   - Get first user with comments"
puts "  user_by_username(str) - Find user by username (partial match)"
puts "  list_users           - Print all users with IDs and stats"
