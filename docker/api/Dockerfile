# syntax=docker/dockerfile:1.7

ARG DOTNET_VERSION=10.0

FROM mcr.microsoft.com/dotnet/sdk:${DOTNET_VERSION} AS build
WORKDIR /src

ARG BACKEND_PROJECT_PATH=src/ApplicationBase.Api/ApplicationBase.Api.csproj

COPY . .

RUN dotnet restore "$BACKEND_PROJECT_PATH"
RUN dotnet publish "$BACKEND_PROJECT_PATH" \
    --configuration Release \
    --no-restore \
    --output /app/publish \
    /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:${DOTNET_VERSION} AS runtime
WORKDIR /app

ARG BACKEND_ASSEMBLY_NAME=ApplicationBase.Api.dll

ENV ASPNETCORE_URLS=http://+:8080 \
    DOTNET_RUNNING_IN_CONTAINER=true \
    BACKEND_ASSEMBLY_NAME=${BACKEND_ASSEMBLY_NAME}

EXPOSE 8080

COPY --from=build /app/publish .

ENTRYPOINT ["sh", "-c", "dotnet \"$BACKEND_ASSEMBLY_NAME\""]
