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

# If you want to use Jekyll native, uncomment the line below.
# To upgrade, run `bundle update`.

#gem "jekyll", "~> 3.3.0"
gem "minimal-mistakes-jekyll"
gem "wdm", "~> 0.1.0" if Gem.win_platform?

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem 'octopress'
  gem 'jekyll-archives'
  gem 'jekyll-twitter-plugin'
  gem 'jekyll-lunr-js-search'
  gem 'nokogiri', '~> 1.6.0'     # 1.7 requires ruby >= 2.1.0
  gem 'classifier-reborn'        # --lsi support
  gem 'rb-gsl'                   # make lsi faster.  Don't forget brew install gsl
#  gem 'jekyll-paginate'
#  gem 'jekyll-sitemap'
#  gem 'jekyll-gist'
#  gem 'jekyll-feed'
#  gem 'jemoji'
end
