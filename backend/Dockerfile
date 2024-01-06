## Build
FROM golang:1.21-buster AS build

WORKDIR /app

COPY . ./

RUN go mod download

RUN go build -o /xivtodo-server

## Deploy
FROM gcr.io/distroless/base-debian10

WORKDIR /

COPY --from=build /xivtodo-server /xivtodo-server

EXPOSE 8181

USER nonroot:nonroot

ENTRYPOINT ["/xivtodo-server"]