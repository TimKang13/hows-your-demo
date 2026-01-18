# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin_all_from "app/javascript/utils", under: "utils"
pin "wavesurfer.js", preload: false # @7.11.1
pin "wavesurfer.js/dist/plugins/regions.esm.js", to: "wavesurfer.js--dist--plugins--regions.esm.js.js" # @7.12.1
