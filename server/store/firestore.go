package store

import (
	"cloud.google.com/go/firestore"
	"context"
	"log"
)

const gcpProjectID = "xiv-todo"

var (
	Ctx    context.Context
	Client *firestore.Client
)

func init() {
	var err error
	Ctx = context.Background()

	Client, err = firestore.NewClient(Ctx, gcpProjectID)
	if err != nil {
		log.Fatalf("Failed to create Firestore client: %v", err)
	}

	log.Println("initialized Firestore client for project", gcpProjectID)
}
