source "https://rubygems.org"

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!

# disabled https://github.com/mmistakes/minimal-mistakes/issues/570#issuecomment-251855433
# gem "github-pages", group: :jekyll_plugins

# for lunr-js-search
gem 'json'

# for octopress-flickr
# gem 'flickraw'

# If you want to use Jekyll native, uncomment the line below.
# To upgrade, run `bundle update`.

# gem "jekyll", "~> 3.3.0"
# gem 'net-http-persistent', '~> 2.9', '>= 2.9.4'

# gem "minimal-mistakes-jekyll"
gem "minimal-mistakes-jekyll", :github => "mmistakes/minimal-mistakes"
# gem "minimal-mistakes-jekyll", :github => "mmistakes/minimal-mistakes", :branch => 'color-skins'
gem "wdm", "~> 0.1.0" if Gem.win_platform?
gem 'ffi'                                 # html-proofer requirement
gem 'html-proofer'
gem 'travis'

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem 'liquid-md5'
  gem 'jekyll-archives'
  gem 'jekyll-lunr-js-search', '~>3.2.0'
  gem 'octopress'
#  gem 'liquid', '~> 3.0.6'               # would be nice if osx updated ruby
#  gem 'nokogiri', '~> 1.6.0'             # 1.7 requires ruby >= 2.1.0
#  gem 'classifier-reborn'                # --lsi support
#  gem 'rb-gsl'                           # make lsi faster.  Don't forget brew install gsl, Travis does not like gsl.
#  gem 'jekyll-twitter-plugin'
end
