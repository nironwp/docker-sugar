FROM golang:1.19 AS builder

WORKDIR /app

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build main.go

FROM scratch

COPY --from=builder /app/main /app

ENTRYPOINT ["/app"]