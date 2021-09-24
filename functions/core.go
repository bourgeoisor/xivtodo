package lodestone

import (
	"github.com/karashiiro/bingode"
	"github.com/xivapi/godestone/v2"
)

var scraper *godestone.Scraper

func init() {
	scraper = godestone.NewScraper(bingode.New(), godestone.EN)
}
