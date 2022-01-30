package gender

type Gender uint8

const (
	None Gender = iota
	Male
	Female
)

func Parse(input string) Gender {
	switch input {
	case "♂":
		return Male
	case "♀":
		return Female

	}
	return None
}
