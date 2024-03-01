const COLLEGE = Object.freeze([
  { value: 'default', name: '학부' },
  { value: 'ConvergenceTechnology', name: '융합기술대학' },
  { value: 'Engineering', name: '공과대학' },
  { value: 'HumanitiesSocialSciences', name: '인문사회대학' },
  { value: 'HealthLifeSciences', name: '보건생명대학' },
  { value: 'Railway', name: '철도대학' },
  { value: 'FutureConvergence', name: '미래융합대학' },
  { value: 'FacultyOfLiberalArts', name: '교양학부' },
  { value: 'Free', name: '자유전공학부' },
  { value: 'CreativeConvergence', name: '창의융합학부' },
]);

const DEPARTMENT: { [key: string]: { value: string; name: string }[] } = Object.freeze({
  ConvergenceTechnology: [
    { value: 'MechanicalEngineering', name: '기계공학과' },
    { value: 'AutomotiveEngineering', name: '자동차공학과' },
    { value: 'AircraftMechanicalDesign', name: '항공기계설계학과' },
    { value: 'ElectricalEngineering', name: '전기공학과' },
    { value: 'ElectricEngineering', name: '전자공학과' },
    { value: 'ComputerEngineering', name: '컴퓨터공학과' },
    { value: 'ComputerSoftware', name: '컴퓨터소프트웨어학과' },
    { value: 'AIRoboticsEngineering', name: 'AI로봇공학과' },
    { value: 'BiomedicalConvergence', name: '바이오메디컬융합학과' },
    { value: 'PrecisionMedicineMedicalDevices', name: '정밀의료/의료기기학과' },
  ],
  Engineering: [
    { value: 'TransportationEngineering', name: '건설환경도시교통공학부' },
    { value: 'ChemicalBiologicalEngineering', name: '화공생물공학과' },
    { value: 'AdvancedSemiconductorMaterialsEngineering', name: '반도체신소재공학과' },
    { value: 'NanoChemicalMaterialsEngineering', name: '나노화학소재공학과' },
    { value: 'IndustrialManagementEngineering', name: '산업경영공학과' },
    { value: 'SafetyEngineering', name: '안전공학과' },
    { value: 'ArchitecturalEngineering', name: '건축공학과' },
    { value: 'Architecture', name: '건축학과(5년제)' },
    { value: 'IndustrialDesign', name: '산업디자인학과' },
    { value: 'CommunicationDesign', name: '커뮤니케이션디자인학과' },
  ],
  HumanitiesSocialSciences: [
    { value: 'EnglishLanguageLiterature', name: '영어영문학과' },
    { value: 'ChineseLanguage', name: '중국어학과' },
    { value: 'KoreanLanguageLiterature', name: '한국어문학과' },
    { value: 'PublicAdministration', name: '행정학과' },
    { value: 'AdministrativeInformationConvergence', name: '행정정보융합학과' },
    { value: 'BusinessAdministration', name: '경영학과' },
    { value: 'ConvergenceManagement', name: '융합경영학과' },
    { value: 'InternationalTrade', name: '국제무역학과' },
    { value: 'SocialWelfare', name: '사회복지학과' },
    { value: 'Music', name: '음악학과' },
    { value: 'SportsMedicine', name: '스포츠의학과' },
    { value: 'SportsIndustry', name: '스포츠산업학과' },
    { value: 'AviationService', name: '항공서비스학과' },
    { value: 'AviationOperations', name: '항공운항학과' },
    { value: 'EarlyChildhoodEducation', name: '유야교육학과' },
    { value: 'MediaContents', name: '미디어콘텐츠학과' },
  ],
  HealthLifeSciences: [
    { value: 'Nursing', name: '간호학과' },
    { value: 'PhysicalTherapy', name: '물리치료학과' },
    { value: 'EmergencyRescue', name: '응급구조학과' },
    { value: 'FoodLifeSciences', name: '식품생명학부' },
    { value: 'EarlyChildhoodSpecialEducation', name: '유아특수교육학과' },
    { value: 'ITApplicationConvergence', name: 'IT응용융합학과' },
    { value: 'CosmeticIndustry', name: '화장품산업학과' },
    { value: 'NaturalMaterials', name: '천연물소재학과' },
  ],
  Railway: [
    { value: 'RailwayManagementLogistics', name: '철도경영물류학과' },
    { value: 'AIDataEngineering', name: 'AI데이터공학부' },
    { value: 'RailwayOperationSystemEngineering', name: '철도운전시스템공학과' },
    { value: 'RailroadVehicleSystemsEngineering', name: '철도차량시스템공학과' },
    { value: 'RailwayInfrastructureEngineering', name: '철도인프라공학과' },
    { value: 'RailwayElectricalInformationEngineering', name: '철도전기정보공학과' },
  ],
  FutureConvergence: [
    { value: 'SafetyConvergenceEngineering', name: '안전융합공학과' },
    { value: 'ConstructionDisasterEngineering', name: '건설방재융합공학과' },
    { value: 'SportsWelfare', name: '스포츠복지학과' },
    { value: 'WelfareManagement', name: '복지경영학과' },
    { value: 'SmartRailroadTransportationEngineering', name: '스마트철도교통공학과' },
    { value: 'SecondaryBatteryEngineering', name: '이차전지공학과' },
  ],
  FacultyOfLiberalArts: [{ value: 'FacultyOfLiberalArts', name: '교양학부' }],
  Free: [{ value: 'Free', name: '자유전공학부' }],
  CreativeConvergence: [{ value: 'FacultyOfLiberalArts', name: '창의융합학부' }],
});

export { COLLEGE, DEPARTMENT };
