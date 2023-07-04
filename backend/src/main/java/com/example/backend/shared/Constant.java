package com.example.backend.shared;

import com.amazonaws.regions.Regions;

public class Constant {
    public static final String[] CROSS_ORIGIN_ALLOW_LIST = new String[] {"http://localhost:8080", "http://localhost:4200"};
    public static class Firebase {
        public static final String API_URL = "https://useful-tools-api-default-rtdb.firebaseio.com";
        public static final String EVENTS_API = "https://useful-tools-api-default-rtdb.firebaseio.com/events.json";
    }
    public static class AWSConfig {
        public static final String SQS_ENDPOINT = "http://localhost:9324";
        public static final String AWS_CREDENTIAL_ACCESS_KEY = "AKIAR6KBL4DCX7ECZ62T";
        public static final String AWS_CREDENTIAL_SECRET_KEY = "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";
        public static final String AWS_IAM_ACCOUNT = "133817950405";
        public static final String AWS_ROOT_ACCOUNT = "theanh2906";
        public static final String AWS_SQS_API = "https://sqs.us-east-2.amazonaws.com/" + AWS_IAM_ACCOUNT + "/" + AWS_ROOT_ACCOUNT;
        public static final String AWS_SQS_REGION = Regions.US_EAST_2.getName();
        public static final String AWS_SQS_QUEUE_NAME = "theanh2906";
        public static final String AWS_S3_REGION = Regions.AP_SOUTHEAST_1.getName();
        public static final String AWS_S3_BUCKET_NAME = "theanh2906-bucket";
    }
}
