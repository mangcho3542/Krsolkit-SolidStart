export type AutoComplete =
  // 기본
  | "on"
  | "off"
  // 이름 관련
  | "name"
  | "honorific-prefix"
  | "given-name"
  | "additional-name"
  | "family-name"
  | "honorific-suffix"
  | "nickname"

  // 계정/인증
  | "email"
  | "username"
  | "new-password"
  | "current-password"
  | "one-time-code"

  // 조직
  | "organization-title"
  | "organization"

  // 주소
  | "street-address"
  | "address-line1"
  | "address-line2"
  | "address-line3"
  | "address-level4"
  | "address-level3"
  | "address-level2"
  | "address-level1"
  | "country"
  | "country-name"
  | "postal-code"

  // 신용카드
  | "cc-name"
  | "cc-given-name"
  | "cc-additional-name"
  | "cc-family-name"
  | "cc-number"
  | "cc-exp"
  | "cc-exp-month"
  | "cc-exp-year"
  | "cc-csc"
  | "cc-type"

  // 거래
  | "transaction-currency"
  | "transaction-amount"

  // 기타
  | "language"

  // 생일
  | "bday"
  | "bday-day"
  | "bday-month"
  | "bday-year"

  // 성별
  | "sex"

  // 전화번호
  | "tel"
  | "tel-country-code"
  | "tel-national"
  | "tel-area-code"
  | "tel-local"
  | "tel-extension"

  // 기타
  | "impp"
  | "url"
  | "photo";