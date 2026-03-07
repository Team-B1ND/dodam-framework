# Changesets

This folder is managed by `@changesets/cli`.

## Usage

변경사항이 있을 때 아래 명령어로 changeset을 추가하세요:

```bash
pnpm changeset
```

이 명령어는 어떤 패키지가 변경되었는지, 버전 범프 타입(patch/minor/major)은 무엇인지,
변경 요약을 입력받아 `.changeset/` 디렉토리에 마크다운 파일을 생성합니다.

main 브랜치에 머지되면 Changesets bot이 자동으로 "Version Packages" PR을 생성하고,
해당 PR이 머지되면 npm 배포 + GitHub Release가 자동으로 생성됩니다.
