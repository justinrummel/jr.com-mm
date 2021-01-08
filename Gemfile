source "https://rubygems.org"

### MM Gems
gem "minimal-mistakes-jekyll", :github => "mmistakes/minimal-mistakes"
# gem "minimal-mistakes-jekyll", :github => "mmistakes/minimal-mistakes", :branch => 'smooth-scroll-gumshoe'

gem "wdm", "~> 0.1.0" if Gem.win_platform?
gem 'liquid-c'					# gem to speed up Liquid parsing - https://talk.jekyllrb.com/t/help-us-benchmark-jekyll/1629/18
gem "nokogiri", ">= 1.11.0.rc4"			# html-proofer requirement
gem 'ffi'					# html-proofer requirement
gem 'html-proofer'
gem 'travis'
gem 'json', '2.3.1'
gem 'jekyll', ">=3.7", "< 4.0"			#jekyll requires ruby 2.4 which is not on Mojave
gem 'launchy', '2.4.3'

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem 'jekyll-include-cache'			# gem to speed up Liquid parsing
  gem 'jekyll-commonmark'			# gem to speed up Markdown
  gem 'liquid-md5'
  gem 'jekyll-archives'
  gem 'octopress'
  gem "kramdown-parser-gfm"
end
