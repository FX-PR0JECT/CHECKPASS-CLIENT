#!/bin/bash

# icons 객체를 담을 파일을 초기화하고 시작합니다.
echo "export const icons = {" > common/icons.ts

# 파일 이름을 CamelCase로 변환하는 함수입니다.
convert_to_camel_case() {
  # 언더스코어를 제거하고 뒤에 오는 문자를 대문자로 변환합니다.
  echo "$1" | perl -pe 's/_(\w)/\U$1/g'
}

# 파일과 폴더를 순회하며 icons 객체를 구성하는 함수입니다.
traverse() {
  local indentation="$1"
  local path="$2"
  local parent="$3"

  # 디렉토리인 경우
  for dir in "$path"/*/; do
    if [ -d "${dir}" ]; then
      dir=${dir%/}  # trailing slash 제거
      local dirName=$(basename "${dir}")
      dirName=$(convert_to_camel_case "${dirName}")
      echo "${indentation}${dirName}: {" >> common/icons.ts
      traverse "${indentation}  " "${dir}" "${parent}/${dirName}"
      echo "${indentation}}," >> common/icons.ts
    fi
  done

  # 파일인 경우
  for file in "$path"/*.*; do
    if [ -f "${file}" ]; then
      local extension="${file##*.}"
      local filename=$(basename "${file}" ."$extension")
      local originalFilename=${filename}
      filename=$(convert_to_camel_case "${filename}")
      local filePath="${parent}/${originalFilename}.${extension}"
      filePath=${filePath#public/}  # 'public/' 경로 제거
      echo "${indentation}${filename}: '${filePath}'," >> common/icons.ts
    fi
  done
}

# icons 객체 구성 시작
traverse "  " "src/Assets/Image" "src/Assets/Image" 

# 객체 닫기
echo "};" >> common/icons.ts

echo "Icons have been generated in common/icons.ts"